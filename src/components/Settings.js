import React, { useState, useContext } from "react";
import { MessageContext } from "./DashBoard";
import { Box, Container, Card, CardContent, CardHeader, TextField, Divider, Button } from "@mui/material";
import UserService from "../api/User";

export default function Settings(props) {

    const { setSuccess, setError } = useContext(MessageContext)

    const [values, setValues] = useState({
        password: '',
        new_password: ''
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        UserService.updateCurrentUserPassword(values.password, values.new_password).then(resp => {
            if (resp.err) {
                setError(resp.err)
            } else {
                setError("");
                setSuccess(resp.result)
            }
        });
    }


    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Box
                        component="form"
                        method="post"
                        sx={{ pt: 3 }}
                        onSubmit={handleSubmit}
                    >
                        <Card>
                            <CardHeader
                                title="更新密码"
                                sx={{
                                    height: 60,
                                    backgroundColor: (theme) => theme.palette.grey[200]
                                }}
                            />
                            <Divider />
                            <CardContent>
                                <TextField
                                    fullWidth
                                    label="Old Password"
                                    margin="normal"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="New password"
                                    margin="normal"
                                    name="new_password"
                                    onChange={handleChange}
                                    type="password"
                                    value={values.new_password}
                                    variant="outlined"
                                />
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    p: 2
                                }}
                            >
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                >
                                    更新
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    )
}