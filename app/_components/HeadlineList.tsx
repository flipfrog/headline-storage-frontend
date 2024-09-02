'use client'

import {Headline} from "@/app/page";
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from "@mui/material";

const HeadlineList = ({ headlines }: { headlines: Headline[] }) => (
    <TableContainer  component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>forward ref IDs</TableCell>
                    <TableCell>backward ref IDs</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { headlines.map(headline => (
                    <TableRow key={headline.id}>
                        <TableCell>{ headline.id }</TableCell>
                        <TableCell>{ headline.title }</TableCell>
                        <TableCell>{ headline.forward_refs?.map(ref => `${ref.id}:${ref.title}`).join(', ') }</TableCell>
                        <TableCell>{ headline.backward_refs?.map(ref => `${ref.id}:${ref.title}`).join(', ') }</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default HeadlineList;
