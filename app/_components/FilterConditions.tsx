'use client'

import {Checkbox, FormControlLabel, Grid2 as Grid} from "@mui/material";
import * as React from "react";

const FilterConditions = ({ categories, checkedCategories, onChangeCategoryCheckbox }:
                              {
                                  categories: string[],
                                  checkedCategories: string[],
                                  onChangeCategoryCheckbox: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
                              }) => {
    return (
        <Grid container spacing={2} padding={'1.5em'}>
            {
                categories.map((category, index) => (
                    <Grid key={index} size={4}>
                        <FormControlLabel
                            control={
                                <Checkbox defaultChecked={checkedCategories.includes(category)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeCategoryCheckbox(event, index)}/>
                            }
                            label={category}/>
                    </Grid>)
                )
            }
        </Grid>
    );
}

export default FilterConditions;
