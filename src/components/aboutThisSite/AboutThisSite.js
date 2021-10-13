import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard() {
  return (
    <Box m={6}>
      <Card>
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
          <Typography variant="body2">
            Using ReactJS and Node I create single-page applications and
            components capable of monetization, data charting, api calls, user
            authentication/authorization, database & context management, and
            more.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
