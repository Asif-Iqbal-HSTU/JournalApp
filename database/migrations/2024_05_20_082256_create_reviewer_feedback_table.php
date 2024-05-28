<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviewer_feedback', function (Blueprint $table) {
            $table->id();
            $table->string('paperID');
            $table->string('reviewer');
            $table->text('overallRecommendation');
            $table->text('generalComments');
            $table->text('detailedFeedback');
            $table->text('criticalAssessment');
            $table->text('suggestionsForImprovement');
            $table->text('summaryOfFindings');
            $table->text('assessmentOfOriginality');
            $table->text('assessmentOfClarity');
            $table->text('assessmentOfMethodology');
            $table->text('assessmentOfResults');
            $table->text('assessmentOfReferences');
            $table->text('confidentialCommentsToTheEditor');
            $table->text('additionalReferencesOrResources');
            $table->text('completionTimeframe');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviewer_feedback');
    }
};
