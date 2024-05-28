<?php

namespace App\Http\Controllers;

use App\Models\PaperStatus;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules; 

use Illuminate\Http\Request;

class PaperStatusController extends Controller
{
    //
    public function pendingtoapproved($paper_id)
    {
        $paperStatus = PaperStatus::where('paperID', $paper_id)->first();
        $paperStatus->status = "Approved";
        $paperStatus->save();
        return back();
    }

    public function approvedtodecision(Request $request, $paper_id): RedirectResponse
    {
        //dd($request->status);
        $paperStatus = PaperStatus::where('paperID', $paper_id)->first();
        $paperStatus->status = $request->status;
        $paperStatus->save();
        return back();
    }
}
