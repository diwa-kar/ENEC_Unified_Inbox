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
  const url = preview?.value?.split(".").pop().trim();
  return (
    <>
      {preview && (
        <Dialog
          PaperProps={{
            style: {
              borderRadius:
                url === "png" ||
                url === "jpg" ||
                url === "jpeg" ||
                url === "webp"
                  ? "20px"
                  : "0px",
            },
          }}
          open={preview.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          fullScreen={
            url === "pdf" ||
            url === "pptx" ||
            url === "xlsx" ||
            url === "docx" ||
            preview.value.includes("blob")
              ? true
              : false
          }
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth="sm"
        >
          {(url === "pdf" ||
            url === "pptx" ||
            url === "xlsx" ||
            preview.value.includes("blob") ||
            url === "docx") && (
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
          )}
          <DialogContent sx={{ p: 0, overflow: "hidden" }}>
            {url == "jpg" || url == "png" || url === "webp" || url == "jpeg" ? (
              <Box position="relative">
                <img src={preview.value} height="100%" width="100%" fluid />
                <IconButton
                  size="small"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    background: "#fff",
                    "&:hover": {
                      background: "#fff",
                    },
                  }}
                >
                  <FiX />
                </IconButton>
              </Box>
            ) : (
              <iframe
                src={
                  url === "pdf" || preview.value.includes("blob")
                    ? preview.value
                    : `https://view.officeapps.live.com/op/view.aspx?src=${preview.value}`
                }
                width="100%"
                height="100%"
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default PreviewMedia;
