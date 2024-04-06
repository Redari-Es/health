import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(2),
	},
}));

export default function CopyRight() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant="none" onClick={handleClickOpen}>
				<span className="text-white font-auto">Copyright &copy; 2024</span>
			</Button>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				maxWidth='md'
				open={open}
			>
				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
					<span className="text-xl font-bold">	版权声明</span>
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent dividers>
					<Typography gutterBottom>
						<div className='flex flex-col rounded-2xl bg-custom0 text-white items-center justify-center text-wrap'>
							<span className="text-2xl font-bold text-custom8">MIT License</span>
							<p className="text-lg text-custom8">Copyright (c) 2024 <span className="font-bold">ShonH</span></p>

							<p className="p-2">Permission is hereby granted, free of charge, to any person obtaining a copy
								of this software and associated documentation files (the "Software"), to deal
								in the Software without restriction, including without limitation the rights
								to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
								copies of the Software, and to permit persons to whom the Software is
								furnished to do so, subject to the following conditions:
							</p>

							<p className="p-2">
								The above copyright notice and this permission notice shall be included in all
								copies or substantial portions of the Software.
							</p>
							<p className="p-2">

								THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
								IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
								FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
								AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
								LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
								OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
								SOFTWARE.
							</p>
						</div>

					</Typography>
					<Typography gutterBottom>
						<div className="flex flex-col items-center justify-center p-2">
							<a className='text-xl p-2 m-2 rounded-2xl text-custom8 border bg-custom0 text-custom0 hover:scale-125' href="http://redaries.xyz/">All Rights Reserved</a>
							<p className='text-xl p-2 m-2 rounded-2xl text-custom8 border bg-custom0 text-custom0 hover:scale-125'>
								备案号：<a href="https://beian.miit.gov.cn" target="_top">
									粤ICP备2021174112号
								</a>
							</p>

						</div>
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						已了解
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</React.Fragment>
	);
}
