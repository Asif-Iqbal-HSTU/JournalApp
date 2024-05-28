<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Course;
use App\Models\Paper;
use App\Models\PaperStatus;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
//use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
//use Inertia\Inertia;
//use Inertia\Response;
use App\Models\PaperReviewer;
use App\Models\CourseObjective;
use App\Models\CourseLearningOutcome;
use App\Models\ExternalReviewer;
use App\Models\ReviewerAcceptDecline;
use Illuminate\Support\Facades\Mail;

use App\Mail\Mailings;

class PaperReviewerController extends Controller
{
    //
    public function setReviewer(Request $request): RedirectResponse
    {        
        //dd($request);
        $reviewer = PaperReviewer::where('paperID', $request->paperID)->first();
        //dd($reviewer);
        if($reviewer)
        {
            $reviewer->reviewer = $request->reviewer;
            $reviewer->save();
        }
        else{
            $externalReviewer = PaperReviewer::create([
                'paperID' => $request->paperID,
                'reviewer' => $request->reviewer,
            ]);
        }  
        Mail::to('asif.iqbal.hstu@gmail.com')->send(new Mailings($request->reviewer));    
        /*$mail_data = [
            'recipinet' => $request->reviewer,
            'fromEmail'=>'awe.some.guy.anonymous@gmail.com',
            'fromName' => 'Journal System',
            'subject' => 'Journal Reviewer',
            'body' => "You are a reviewer of a paper submission",
        ];

        Mail::send('email_template', $mail_data, function ($message) use ($mail_data){
            $message->to($mail_data['recipinet'])
                ->from($mail_data['fromEmail'],$mail_data['fromName'])
                ->subject($mail_data['subject']);
        });*/

        $paperStatus = PaperStatus::where('paperID', $request->paperID)->first();
        $paperStatus->status = "Approved";
        $paperStatus->save();


        return back();
    }
}
