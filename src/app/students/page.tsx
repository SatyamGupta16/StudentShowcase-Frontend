"use client";

import { useEffect, useState } from "react";
import { getStudents } from "@/services/studentService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading students...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Students
        </h1>

        <Button>
          Add Student
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Featured</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {students.map((student) => (
                <TableRow key={student._id}>

                  <TableCell>
                    {student.name}
                  </TableCell>

                  <TableCell>
                    {student.email}
                  </TableCell>

                  <TableCell>
                    {student.batch}
                  </TableCell>

                  <TableCell>
                    {student.isFeatured
                      ? "Yes"
                      : "No"}
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        </CardContent>
      </Card>

    </div>
  );
}