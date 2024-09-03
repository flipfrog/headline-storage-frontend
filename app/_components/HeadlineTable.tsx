'use client'

import * as React from "react";
import { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow} from "@mui/material";
import {Headline} from "@/app/page";
import TablePaginationActions from "@/app/_components/TablePaginationActions";

const HeadlineTable = ({ headlines }:{ headlines: Headline[] }) => {

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - headlines.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>forward ref IDs</TableCell>
                        <TableCell>backward ref IDs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? headlines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : headlines
                    ).map((headline : Headline) => (
                        <TableRow key={headline.id}>
                            <TableCell>{headline.id}</TableCell>
                            <TableCell>{headline.title}</TableCell>
                            <TableCell>{headline.category}</TableCell>
                            <TableCell>{headline.forward_refs?.map(ref => `${ref.id}:${ref.title}`).join(', ')}</TableCell>
                            <TableCell>{headline.backward_refs?.map(ref => `${ref.id}:${ref.title}`).join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            colSpan={4}
                            count={headlines.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default HeadlineTable;
