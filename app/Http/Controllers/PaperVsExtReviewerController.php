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

use App\Models\PaperVsExtReviewer;

class PaperVsExtReviewerController extends Controller
{
    //
    public function setExternalReviewer(Request $request): RedirectResponse
    {        
        //dd($request);
        $externalReviewer = PaperVsExtReviewer::create([
            'paperID' => $request->paperID,
            'externalReviewer' => $request->externalReviewer,
        ]);

        return back();
    }
}
