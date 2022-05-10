import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

export default function UserPassword() {
    const [values, setValues] = useState({
        password: '',
        new_password: ''
    });

    return (
        <React.Fragment>
            <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                value={values.password}
                onChange={e => setValues({ ...values, password: e.target.value })}
                type="password"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="New password"
                margin="normal"
                name="new_password"
                value={values.new_password}
                onChange={e => setValues({ ...values, new_password: e.target.value })}
                type="password"
                variant="outlined"
            />
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
        </React.Fragment>
    )
}