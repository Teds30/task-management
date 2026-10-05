<?php

namespace App\Interfaces;

use App\Interfaces\BaseInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ProjectRepositoryInterface extends BaseInterface
{
    /**
     *  Get paginated records.
     * 
     * @param int $perPage
     * @param array $filters
     * @return LengthAwarePaginator
     */
    public function paginate(
        int $perPage = 15,
        array $filters = []
    ): LengthAwarePaginator;
}
