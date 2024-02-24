<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreStudentsRequest;
use App\Http\Resources\StudentsResource;
use App\Models\Student;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $student =StudentsResource::collection(Student::all());

        return response()->json([
            'status'=>'success',
            'message'=>'Student get Succesful',
            'data'=>$student
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentsRequest $request)
    {
        $student = Student::create($request->validated());

        return response()->json([
            'status'=>'success',
            'message'=>'Student store Succesfully',
            'data'=>$student
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $student=Student::find($id);
        return response()->json([
            'status'=>'success',
            'message'=>'Student find Succesful',
            'data'=>$student
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // $student=Student::find($id);
        // return response()->json([
        //     'status'=>'success',
        //     'message'=>'Student get Succesful',
        //     'data'=>$student
        // ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreStudentsRequest $request, string $id)
    {
          $update=[
            'name'=>$request->name,
            'email'=>$request->email
        ];
        $student= Student::where('id',$id)->update($update);
        return response()->json([
            'status'=>'success',
            'message'=>'Student get Succesful',
            'data'=>$student
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student= Student::destroy($id);
        return response()->json([
            'status'=>'success',
            'message'=>'Student deleted Succesful',
            'data'=>$student
        ],200);
    }
}
