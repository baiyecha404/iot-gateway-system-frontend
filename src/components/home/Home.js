import React from "react";
import { Grid, Box, Container } from "@mui/material";
import Data from "./Data";
import TrafficDevice from "./TrafficByDevice";
import LastLogin from "./LastLogin";
import Traffic from "./Traffic";


export default function Home() {

    return (
        <React.Fragment>
            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Data/>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            <Traffic />
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            <TrafficDevice />
                        </Grid>
                        <Grid
                            item
                            lg={18}
                            md={18}
                            xl={9}
                            xs={12}
                        >
                            <LastLogin />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    )
}