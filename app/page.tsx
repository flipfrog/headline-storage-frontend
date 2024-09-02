import Image from "next/image";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

export type Headline = {
  id: number;
  title: string;
  description: string | null;
  forward_refs?: Headline[];
  backward_refs?: Headline[];
};

export default async function Home() {
  type Received = {
    headlines: Headline[];
  };
  const data = await fetch('http://localhost/api/headlines', { cache: 'no-store' });
  const received : Received = await data.json();
  const headlines: Headline[] = received.headlines;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
                  <TableCell>{ headline.forward_refs?.map(ref => ref.id).join(',') }</TableCell>
                  <TableCell>{ headline.backward_refs?.map(ref => ref.id).join(',') }</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
