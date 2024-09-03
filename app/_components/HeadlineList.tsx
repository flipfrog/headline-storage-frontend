'use client'

import  * as React from 'react';
import { useState } from "react";
import { Paper, Box } from "@mui/material";

import { Headline } from "@/app/page";
import { getHeadlines } from "@/app/_components/fetchers";
import FilterConditions from "@/app/_components/FilterConditions";
import HeadlineTable from "@/app/_components/HeadlineTable";

const HeadlineList = ({headlines, categories }: {
    headlines: Headline[],
    categories: string[],
}) => {
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
                <FilterConditions
                    categories={categories}
                    checkedCategories={checkedCategories}
                    onChangeCategoryCheckbox={onChangeCategoryCheckbox}
                />
                <HeadlineTable headlines={filteredHeadlines} />
            </Box>
        </Paper>
    );
};

export default HeadlineList;
