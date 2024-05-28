<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PaperController;
use App\Http\Controllers\PaperStatusController;
use App\Http\Controllers\ExternalReviewerController;
use App\Http\Controllers\PaperVsExtReviewerController;
use App\Http\Controllers\ReviewerFeedbackController;
use App\Http\Controllers\ReviewerAcceptDeclineController;
use App\Http\Controllers\PaperReviewerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\Mailings;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update'); 
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //journals
    Route::get('/page/paper/add', [PaperController::class, 'AddPaperPage'])->name('addPaper.page');
    Route::post('/paper/store', [PaperController::class, 'storePaper'])->name('storePaper');
    Route::post('/reviewer/store', [ExternalReviewerController::class, 'storeExternalReviewer'])->name('storeExternalReviewer');
    
    Route::post('/reviewer/set', [PaperVsExtReviewerController::class, 'setExternalReviewer'])->name('setExternalReviewer');
    Route::get('/editables/download/{id}', [PaperController::class, 'downloadEditableFile'])->name('editableFile.download');   
    Route::get('/pdfs/download/{id}', [PaperController::class, 'downloadPdfFile'])->name('pdfFile.download');  
    
    Route::get('/page/editor/approval', [PaperController::class, 'editorApproval'])->name('editorApproval.page');
    Route::post('/pending/to/reviewing/{paper_id}', [PaperStatusController::class, 'pendingtoapproved'])->name('pendingtoapproved');
    
    Route::get('/page/review', [PaperController::class, 'inReview'])->name('inReview.page');
    //storeFeedback
    Route::post('/store/feedback', [ReviewerFeedbackController::class, 'storeFeedback'])->name('storeFeedback');
    Route::post('/store/RevewerAcceptDecline', [ReviewerAcceptDeclineController::class, 'storeReviewerAcceptDecline'])->name('storeReviewerAcceptDecline');

    Route::get('/page/approved/papers', [PaperController::class, 'approvedPapers'])->name('approvedPapers.page');
    Route::get('/specific/paper/{paper_id}', [PaperController::class, 'specificPaper'])->name('specificPaper.page');
    Route::post('/approved/to/decision/{paper_id}', [PaperStatusController::class, 'approvedtodecision'])->name('approvedtodecision');
    Route::post('/set/reviewer', [PaperReviewerController::class, 'setReviewer'])->name('setReviewer');
    
    Route::get('/testemail', function(){
        $name = "Ya hoo!!";
        Mail::to('asif.iqbal.hstu@gmail.com')->send(new Mailings($name));
    });
    
});

require __DIR__.'/auth.php';
