<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('furigana');
            $table->string('my_number');
            $table->string('address');
            $table->string('telephone');
            $table->string('birthday');
            $table->string('hire_date');
            $table->string('fire_date');
            $table->string('payroll_account_registration');
            $table->string('bank_name');
            $table->string('branch_number');
            $table->string('branch_name');
            $table->string('account_type');
            $table->string('account_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
};
