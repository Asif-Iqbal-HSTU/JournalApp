<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paper;
use App\Models\ReviewerFeedback;
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
use App\Models\Course;
use App\Models\TeacherCourse;
use App\Models\CourseObjective;
use App\Models\CourseLearningOutcome;
use App\Models\ExternalReviewer;

class ReviewerFeedbackController extends Controller
{
    //
    public function storeFeedback(Request $request): RedirectResponse
    {
        //dd($request);        
        $reviewerFeedback = ReviewerFeedback::create([
            'paperID' => $request->paperID,
            'reviewer' => Auth::user()->email,
            'overallRecommendation' => $request->overallRecommendation,
            'generalComments' => $request->generalComments,
            'detailedFeedback' => $request->detailedFeedback,
            'criticalAssessment' => $request->criticalAssessment,
            'suggestionsForImprovement' => $request->suggestionsForImprovement,
            'summaryOfFindings' => $request->summaryOfFindings,
            'assessmentOfOriginality' => $request->assessmentOfOriginality,
            'assessmentOfClarity' => $request->assessmentOfClarity,
            'assessmentOfMethodology' => $request->assessmentOfMethodology,
            'assessmentOfResults' => $request->assessmentOfResults,
            'assessmentOfReferences' => $request->assessmentOfReferences,
            'confidentialCommentsToTheEditor' => $request->confidentialCommentsToTheEditor,
            'additionalReferencesOrResources' => $request->additionalReferencesOrResources,
            'completionTimeframe' => $request->completionTimeframe,
        ]);
        //dd($paper);

        return back();
    }
}
