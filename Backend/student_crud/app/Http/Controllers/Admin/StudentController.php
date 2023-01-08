<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Validator;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function create(Request $request)
    {

        $student = Student::create([
            "name" => $request->student["name"],
            "class" => $request->student["class"],
            "age" => $request->student["age"],
            "phone" => $request->student["phone"],
            "address" => $request->student["address"],
        ]);

        // $student = Student::create([
        //     "name" => $request->name,
        //     "class" => $request->class,
        //     "age" => $request->age,
        //     "phone" => $request->phone,
        //     "address" => $request->address,
        // ]);

         //for many to many
         $student->teachers()->attach($request->teachers);

         foreach($request->courses as $course){
            $course = Course::create([
                "name" => $request->student["name"],
                "teacher_id" => 
                "student_id" => 
            ]);
         }


        return response()->json([
            "msg" => "student created successfully",
            "data" => $request->teachers
        ]);
    }
}
