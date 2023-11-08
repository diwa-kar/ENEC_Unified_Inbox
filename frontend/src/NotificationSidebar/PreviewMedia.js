import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, IconButton, Typography } from "@mui/material";
// import Image from "next/image";
import { FiX } from "react-icons/fi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function PreviewMedia({ preview, setpreview }) {
  console.log(preview);
  const handleClose = () => {
    setpreview(false);
  };
  const url = preview?.value;
  return (
    <>
      {preview && (
        <Dialog
          PaperProps={{
            style: {
              borderRadius: "0px",
            },
          }}
          open={preview.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          fullScreen={true}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth="sm"
        >
          <DialogTitle
            sx={{ fontSize: "18px" }}
            display="flex"
            justifyContent="space-between"
          >
            <Typography>Media View</Typography>
            <IconButton size="small" onClick={handleClose}>
              <FiX />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 0, overflow: "hidden" }}>
            <iframe
              src={
                preview.value
                //   preview.type === "PDF"
                //     ? preview.value
                // : `https://view.officeapps.live.com/op/view.aspx?src=${
                //     preview.type === "DOC" ? preview.value : preview.value
                //   }`
              }
              width="100%"
              height="100%"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default PreviewMedia;
