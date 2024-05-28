<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\ExternalReviewer;

class ExternalReviewerController extends Controller
{
    //

    public function storeExternalReviewer(Request $request): RedirectResponse
    {        
        //dd($request);
        $externalReviewer = ExternalReviewer::create([
            'name' => $request->name,
            'email' => $request->email,
            'affiliation' => $request->affiliation,
            'academicTitle' => $request->academicTitle,
        ]);

        return back();
    }

    

}
