import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

type Props = {
  feedback: any;
};

export default function FeedbackCard({ feedback }: Props) {
  return (
    <div style={{ marginBottom: 8 }}>
      <Typography variant="h6">Aluno: {feedback.aluno}</Typography>
      <Typography variant="h6">Avaliação: {feedback.observacoes}</Typography>
      <Typography variant="h6">Nota: {feedback.nota}</Typography>
    </div>
  );
}
