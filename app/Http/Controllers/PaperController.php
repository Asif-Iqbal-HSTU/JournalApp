<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
use App\Models\Course;
use App\Models\TeacherCourse;
use App\Models\CourseObjective;
use App\Models\CourseLearningOutcome;
use App\Models\ExternalReviewer;
use App\Models\ReviewerAcceptDecline;
use App\Models\PaperReviewer;

use Illuminate\Support\Facades\Redirect;

class PaperController extends Controller
{
    public function AddPaperPage(): Response
    {
        $users = User::where('role', 'reviewer')->get();
        $externalReviewers = ExternalReviewer::all();
        $currentUser = Auth::user();
        $papers = Paper::where('author', $currentUser->email)->get();
        $paperStatus = PaperStatus::all();
        $reviewerFeedbacks = \App\Models\ReviewerFeedback::all();
        $reviewers = \App\Models\ExternalReviewer::all();
        return Inertia::render('Paper/AuthorBoard', [
            'users' => $users,
            'papers' => $papers,
            'paperStatus' => $paperStatus,
            'externalReviewers' => $externalReviewers,
            'reviewerFeedbacks' => $reviewerFeedbacks,
            'reviewers' => $reviewers,
        ]);
    }

    public function storePaper(Request $request): RedirectResponse
    {
        //dd($request);

        $editableFilePath = $this->uploadFile($request, 'editableFile', 'public/editable');
        $pdfFilePath = $this->uploadFile($request, 'pdfFile', 'public/pdf');
        $imageFilePath = $this->uploadFile($request, 'imageFile', 'public/imageZip');

        
        $paper = Paper::create([
            'paperID' => $request->author.'_'.$request->title.'_'.$request->type,
            'type' => $request->type,
            'classification' => $request->classification,
            'author' => $request->author,
            'co_author1' => $request->co_author1,
            'co_author2' => $request->co_author2,
            'co_author3' => $request->co_author3,
            'correspondingAuthor1' => $request->correspondingAuthor1,
            'correspondingAuthor2' => $request->correspondingAuthor2,
            'correspondingAuthor3' => $request->correspondingAuthor3,
            'reviewer1' => $request->reviewer1,
            'reviewer2' => $request->reviewer2,
            'reviewer3' => $request->reviewer3,
            'reviewer4' => $request->reviewer4,
            'language_option' => $request->language_option,
            'comments' => $request->comments,
            'title' => $request->title,
            'abstract' => $request->abstract,
            'keywords' => $request->keywords,
            'funding' => $request->funding,
            'conflictsOfInterest' => $request->conflictsOfInterest,
            'ethicalStatement' => $request->ethicalStatement,
            'consentToPolicies' => $request->consentToPolicies,
            'editableFile' => $editableFilePath,
            'pdfFile' => $pdfFilePath,
            'imageFile' => $imageFilePath,
        ]);


        $paperStatus = PaperStatus::create([
            'paperID' => $request->author.'_'.$request->title.'_'.$request->type,
            'status' => "Pending",
        ]);
        //dd($paper);

        return back();
    }

    private function uploadFile(Request $request, string $fileKey, string $directory): string
    {
        if ($request->hasFile($fileKey)) {
            $fileName = $request->author.'_'.$request->title.'_'.$request->type . '_' . $request->file($fileKey)->getClientOriginalName();
            $filePath = $request->file($fileKey)->storeAs($directory, $fileName);
            return str_replace('public/', '', $filePath);
        }

        throw new \Exception('File not present in request.');
    }

    public function downloadEditableFile($id)
    {
        $paper = \App\Models\Paper::where('paperID', $id)->first();
        //dd($paper->paperID);
        $filePath = $paper->editableFile;

        // Construct the full file path
        $fullFilePath = public_path('storage/editable/' . basename($filePath));
        // Debug the full file path
        //dd($fullFilePath);

        if (file_exists($fullFilePath)) {
            return response()->download($fullFilePath);
        } else {
            abort(404, 'File not found');
        }
    }

    public function downloadPdfFile($id)
    {
        $paper = \App\Models\Paper::where('paperID', $id)->first();
        $filePath = $paper->pdfFile;

        // Construct the full file path
        $fullFilePath = public_path('storage/pdf/' . basename($filePath));
        // Debug the full file path
        //dd($fullFilePath);

        if (file_exists($fullFilePath)) {
            return response()->download($fullFilePath);
        } else {
            abort(404, 'File not found');
        }
    }

    public function editorApproval(): Response
    {
        //$users = User::where('role', 'reviewer')->get();
        //$externalReviewers = ExternalReviewer::all();
        //$currentUser = Auth::user();
        $papers = Paper::all();
        $paperStatus = PaperStatus::all();
        $externalReviewers = ExternalReviewer::all();
        return Inertia::render('Paper/EditorApproval', [
            'papers' => $papers,
            'paperStatus' => $paperStatus,
            'externalReviewers' => $externalReviewers,
        ]);
    }

    public function inReview(): Response
    {
        //$users = User::where('role', 'reviewer')->get();
        //$externalReviewers = ExternalReviewer::all();
        //$currentUser = Auth::user();
        $papers = Paper::all();
        $paperStatus = PaperStatus::all();
        $paperReviewers = PaperReviewer::all();
        $reviewerAcceptDecline = ReviewerAcceptDecline::all();
        return Inertia::render('Paper/InReview', [
            'papers' => $papers,
            'paperStatus' => $paperStatus,
            'reviewerAcceptDecline' => $reviewerAcceptDecline,
            'paperReviewers' => $paperReviewers,
        ]);
    }

    public function approvedPapers(): Response
    {
        //$users = User::where('role', 'reviewer')->get();
        //$externalReviewers = ExternalReviewer::all();
        //$currentUser = Auth::user();
        $papers = Paper::all();
        $paperStatus = PaperStatus::all();
        $reviewerAcceptDecline = ReviewerAcceptDecline::all();
        return Inertia::render('Paper/ApprovedPapers', [
            'papers' => $papers,
            'paperStatus' => $paperStatus,
            'reviewerAcceptDecline' => $reviewerAcceptDecline,
        ]);
    }

    public function specificPaper($paper_id): Response
    {
        $paper = \App\Models\Paper::where('paperID', $paper_id)->first();
        $reviewerFeedbacks = \App\Models\ReviewerFeedback::where('paperID', $paper_id)->get();
        $reviewerAcceptDeclines = \App\Models\ReviewerAcceptDecline::where('paperID', $paper_id)->get();
        $externalReviewers = \App\Models\ExternalReviewer::all();
        //dd($reviewerAcceptDeclines);
        return Inertia::render('Paper/SpecificPaperReviews', [
            'paper' => $paper,
            'reviewerFeedbacks' => $reviewerFeedbacks,
            'reviewerAcceptDeclines' => $reviewerAcceptDeclines,
            'externalReviewers' => $externalReviewers,
        ]);
    }

}
