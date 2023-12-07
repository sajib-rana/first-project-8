import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Student } from './student.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';
// import { TStudent } from './student.interface';

// const createStudentIntoDB = async (studentData: TStudent) => {
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('are beta user already exist');
//   }
//   const result = await Student.create(studentData);

//   // const student = new Student(studentData)
//   // if(await student.isUserExists(studentData.id)){
//   //     throw new Error('user already exist')
//   // }
//   //  const result = await student.save(); //built in instance method

//   return result;
// };

const getAllStudentsFromDB = async (query:Record<string,unknown>) => {
  
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({id});
 const result = await Student.findById( id )
   .populate('admissionSemester')
   .populate({
     path: 'academicDepartment',
     populate: {
       path: 'academicFaculty',
     },
   });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, gurdian, localGurdian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGurdian && Object.keys(localGurdian).length) {
    for (const [key, value] of Object.entries(localGurdian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate( id , modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
       id ,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
     const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
