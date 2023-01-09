<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Validator;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::get();
        
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

        $student = Student::create([
            "name" => $request->name,
            "class" => $request->classes,
            "age" => $request->age,
            "phone" => $request->phone,
            "address" => $request->address,
        ]);

         //for many to many
        //  $student->teachers()->attach($request->teachers);

        //  foreach($request->courses as $course){
        //     $course = Course::create([
        //         "name" => $request->student["name"],
        //         "teacher_id" => 
        //         "student_id" => 
        //     ]);
        //  }


        return response()->json([
            "msg" => "student created successfully",
            "data" => $request->name
        ]);
    }
}
