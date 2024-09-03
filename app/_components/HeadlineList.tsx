'use client'

import  * as React from 'react';
import { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, TablePagination } from '@mui/material';
import { Paper, Box } from "@mui/material";

import { Headline } from "@/app/page";
import { getHeadlines } from "@/app/_components/fetchers";
import FilterConditions from "@/app/_components/FilterConditions";
import TablePaginationActions from "@/app/_components/TablePaginationActions";

const HeadlineList = ({headlines, categories }: {
    headlines: Headline[],
    categories: string[],
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    const [ checkedCategories, setCheckedCategories ] = useState<string[]>([]);
    const [ filteredHeadlines, setFilteredHeadlines ] = useState<Headline[]>(headlines);

    const onChangeCategoryCheckbox = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const subjectCategory = categories[index];
        const checked = event.target.checked;
        const newCheckedCategories = checked ? checkedCategories.concat(subjectCategory) : checkedCategories.filter(category => category !== subjectCategory);
        setCheckedCategories(newCheckedCategories);
        const newFilteredHeadlines = await getHeadlines(newCheckedCategories);
        setFilteredHeadlines(newFilteredHeadlines);
    };

    return (
        <Paper>
            <Box sx={{ flexGrow: 1 }}>
                <FilterConditions categories={categories} onChangeCategoryCheckbox={onChangeCategoryCheckbox} />
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
                                    ? filteredHeadlines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredHeadlines
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
                                    count={filteredHeadlines.length}
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
            </Box>
        </Paper>
    );
};

export default HeadlineList;
