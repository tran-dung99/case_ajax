<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

            $books = Book::all();
            return response()->json($books);


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         $book = Book::updateOrCreate([
             'title'=> $request->title,
             'code' => $request->code,
             'author' => $request->author,
         ]);
         return response()->json(["data"=>$book,'success'=>true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $book = Book::findOrfail($id);
        return response()->json(["data"=>$book]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
          $data = $request->only("title","code","author");
          $book = Book::findOrFail($id);
          $book->update($data);
          return response()->json(["data"=>$book,"success"=>true]);
    }


    public function destroy($id)
    {
         $book = Book::findOrFail($id);
         $book->delete();
        return response()->json(['success' => true]);
    }
}
