import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, backgroundColor: "#fff" },
  section: { marginBottom: 10 },
  header: { fontSize: 18, marginBottom: 10, fontWeight: "bold", color: "#4C51BF" },
  tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#000", marginBottom: 5 },
  tableRow: { flexDirection: "row", marginBottom: 2 },
  cell: { flex: 1, padding: 2 },
  bold: { fontWeight: "bold" },
});

export default function GradesReport({ subject, grades, analysisData }) {
  return (
    <div className="mt-6">
      <PDFDownloadLink
        document={
          <Document>
            <Page style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.header}>Subject: {subject.name}</Text>
                <Text>{subject.description}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.bold}>AI Analysis:</Text>
                <Text>{analysisData.analysis}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.bold}>Students Grades:</Text>
                {/* Table header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.cell, styles.bold]}>Student</Text>
                  <Text style={[styles.cell, styles.bold]}>Prelim</Text>
                  <Text style={[styles.cell, styles.bold]}>Midterm</Text>
                  <Text style={[styles.cell, styles.bold]}>Semifinal</Text>
                  <Text style={[styles.cell, styles.bold]}>Final</Text>
                </View>
                {/* Table rows */}
                {grades.map((g) => (
                  <View key={g.id} style={styles.tableRow}>
                    <Text style={styles.cell}>{g.student.name}</Text>
                    <Text style={styles.cell}>{g.prelim}</Text>
                    <Text style={styles.cell}>{g.midterm}</Text>
                    <Text style={styles.cell}>{g.semifinal}</Text>
                    <Text style={styles.cell}>{g.final}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.bold}>Passed Students:</Text>
                <Text>{analysisData.passedStudents.join(", ") || "None"}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.bold}>Failed Students:</Text>
                <Text>{analysisData.failedStudents.join(", ") || "None"}</Text>
              </View>
            </Page>
          </Document>
        }
        fileName={`${subject.code}_Grades_Report.pdf`}
      >
        {({ loading }) => (
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 rounded-full hover:scale-105 transition">
            {loading ? "Generating PDF..." : "Download PDF Report"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
