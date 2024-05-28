<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
//use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\ReviewerAcceptDecline;

class ReviewerAcceptDeclineController extends Controller
{
    public function storeReviewerAcceptDecline(Request $request): RedirectResponse
    {   
        $reviewerAcceptDecline = ReviewerAcceptDecline::create([
            'paperID' => $request->paperID,
            'reviewer' => Auth::user()->email,
            'state' => $request->state,
        ]);
        return back();
    }
}
