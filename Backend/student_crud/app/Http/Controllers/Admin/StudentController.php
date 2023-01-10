<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Student;
use App\Models\StudentTeacher;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::withCount('teachers')->get();
        
        return response()->json([
            "msg" => "students fetched",
            "data" => $students
        ]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            "name" => 'required',
            "classes" => 'required',
            "age" => 'required',
            "phone" => 'required',
            "address" => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }

        $num_of_array = sizeof($request->addTeacher);
        $teacher_course_array = $request->addTeacher;

        if($num_of_array == 0){
            return response()->json([
                "success" => false,
                "msg" => "Please select at leaset one teacher & course!"
            ], 400);
        }

        $student = Student::create([
            "name" => $request->name,
            "class" => $request->classes,
            "age" => $request->age,
            "phone" => $request->phone,
            "address" => $request->address,
        ]);

        for($i=0; $i<$num_of_array; $i++){
            StudentTeacher::create([
                "student_id" => $student->id,
                "teacher_id" => $teacher_course_array[$i]['teacher_id']
            ]);

            $course = Course::create([
                "name" => $teacher_course_array[$i]['course'],
                "teacher_id" => $teacher_course_array[$i]['teacher_id'],
                "student_id" => $student->id,
            ]);
        }

        return response()->json([
            "msg" => "student created successfully"
        ]);
    }

    public function show(Request $request)
    {
        $student = Student::with('courses.teacher','teachers')->where('id',$request->id)->first();
        
        $courses = DB::table('students')
        ->join('courses','students.id','=','courses.student_id')
        ->join('teachers','teachers.id','=','courses.teacher_id')
        ->select('courses.id as id','courses.name as course','teachers.id as teacher_id')
        ->where('students.id','=',$request->id)
        ->get();

        return response()->json([
            "msg" => "students fetched",
            "data" => $student,
            "courses" => $courses
        ]);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            "name" => 'required',
            "classes" => 'required',
            "age" => 'required',
            "phone" => 'required',
            "address" => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }

        $student = Student::find($request->id);
        if(!$student){
            return response()->json([
                "success" => false,
                "msg" => "student not found!"
            ], 400);
        }

        $num_of_array = sizeof($request->addTeacher);
        $teacher_course_array = $request->addTeacher;

        if($num_of_array == 0){
            return response()->json([
                "success" => false,
                "msg" => "Please select at leaset one teacher & course!"
            ], 400);
        }

        $studentUpdated = $student->update([
            "name" => $request->name,
            "class" => $request->classes,
            "age" => $request->age,
            "phone" => $request->phone,
            "address" => $request->address,
        ]);

        $old_pivot = DB::table('student_teachers')->where('student_id', $request->id)->get();

        $old_pivot_count = count($old_pivot);

        $deletedVouchers = $request->deletedVouchers;
        $deletedCount = sizeof($request->deletedVouchers);

        for($k = 0; $k < $old_pivot_count ; $k++){
            if($deletedCount > 0){
                for($m = 0; $m < $deletedCount; $m++){
                    if($old_pivot[$k]->teacher_id == $deletedVouchers[$m]['teacher_id'])
                    {                        
                        $pivotDeleted = DB::table('student_teachers')
                                            ->where('id', $old_pivot[$k]->id)
                                            ->delete();
                    }
                }
            }

            for($l = 0; $l < $num_of_array; $l++){
                if($old_pivot[$k]->teacher_id != $teacher_course_array[$l]['teacher_id']){
                    $item_exist_check = DB::table('student_teachers')->where('student_id', $request->id)
                                        ->where('teacher_id',$teacher_course_array[$l]['teacher_id'])->first();
                    if($item_exist_check == null){
                        StudentTeacher::create([
                            "student_id" => $student->id,
                            "teacher_id" => $teacher_course_array[$l]['teacher_id']
                        ]);
                    }
                }
            }
        }

        $old_course = DB::table('courses')->where('student_id', $request->id)->get();
        $old_course_count = count($old_pivot);

        for($i = 0; $i < $old_course_count ; $i++){
            if($deletedCount > 0){
                for($n = 0; $n < $deletedCount; $n++){
                    if($old_course[$i]->name == $deletedVouchers[$n]['course'])
                    {                        
                        $courseDeleted = DB::table('courses')
                                            ->where('id', $old_course[$i]->id)
                                            ->delete();
                    }
                }
            }

            for($j = 0; $j < $num_of_array; $j++){
                if($old_course[$i]->name != $teacher_course_array[$j]['course']){
                    $course_exist_check = DB::table('courses')->where('student_id', $request->id)
                                        ->where('name',$teacher_course_array[$j]['course'])->first();
                    if($course_exist_check == null){
                        $course = Course::create([
                            "name" => $teacher_course_array[$j]['course'],
                            "teacher_id" => $teacher_course_array[$j]['teacher_id'],
                            "student_id" => $student->id,
                        ]);
                    }
                }
            }
        }

        return response()->json([
            "msg" => "student updated successfully"
        ]);
    }
}
