<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::get();
        
        return response()->json([
            "msg" => "teacher fetched",
            "data" => $teachers
        ]);
    }

    public function create(Request $request)
    {
        $teacher = Teacher::create([
            "name" => $request->teacher["name"],
            "department" => $request->teacher["department"],
            "phone" => $request->teacher["phone"],
            "email" => $request->teacher["email"],
        ]);

        return response()->json([
            "msg" => "student created successfully",
            
        ]);
    }
}
