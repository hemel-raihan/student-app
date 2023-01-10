<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Teacher;
use Validator;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::withCount('students')->get();
        
        return response()->json([
            "msg" => "teacher fetched",
            "data" => $teachers
        ]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            "name" => 'required',
            "department" => 'required|string',
            "phone" => 'required|min:11',
            "email" => 'required|email',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }

        $teacher = Teacher::create([
            "name" => $request->name,
            "department" => $request->department,
            "phone" => $request->phone,
            "email" => $request->email,
        ]);

        return response()->json([
            "msg" => "student created successfully",
        ]);
    }

    public function show(Request $request)
    {
        $teacher = Teacher::with('courses','students')->where('id',$request->id)->first();

        return response()->json([
            "msg" => "teacher fetched",
            "data" => $teacher,
        ]);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            "name" => 'required',
            "department" => 'required|string',
            "phone" => 'required|min:11',
            "email" => 'required|email',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }

        $teacher = Teacher::find($request->id);
        if(!$teacher){
            return response()->json([
                "success" => false,
                "msg" => "teacher not found!"
            ], 400);
        }

        $teacherUpdated = $teacher->update([
            "name" => $request->name,
            "department" => $request->department,
            "phone" => $request->phone,
            "email" => $request->email,
        ]);

        return response()->json([
            "msg" => "teacher updated successfully"
        ]);
    }
}
