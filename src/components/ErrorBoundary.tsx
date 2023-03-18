import { Stack, Typography } from "@mui/material";
import { Component } from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | undefined;
};

class ErrorBoundary extends Component<any, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Stack width="100%">
          <Typography variant="h4">An error has occurred.</Typography>
          <Typography variant="h5">Sorry about that.</Typography>
        </Stack>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
