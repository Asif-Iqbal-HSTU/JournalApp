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
        Schema::create('papers', function (Blueprint $table) {
            $table->id();
            $table->string('paperID');
            $table->string('type');
            $table->string('classification');
            $table->string('author');
            $table->string('co_author1')->nullable();
            $table->string('co_author2')->nullable();
            $table->string('co_author3')->nullable();
            $table->string('correspondingAuthor1')->nullable();
            $table->string('correspondingAuthor2')->nullable();
            $table->string('correspondingAuthor3')->nullable();             
            $table->string('reviewer1')->nullable();
            $table->string('reviewer2')->nullable();
            $table->string('reviewer3')->nullable();
            $table->string('reviewer4')->nullable();
            $table->string('language_option');
            $table->text('comments');
            $table->text('title');
            $table->text('abstract');
            $table->text('keywords');
            $table->text('editableFile');
            $table->text('pdfFile');
            $table->text('imageFile');
            $table->text('funding');
            $table->text('conflictsOfInterest');
            $table->text('ethicalStatement');
            $table->text('consentToPolicies');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('papers');
    }
};
