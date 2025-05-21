// import React, { useEffect, useRef, useState } from "react";
// import { fabric } from "fabric";
// import { useDispatch, useSelector } from "react-redux";
// import { setTransform, resetEditor } from "./redux/actions";
// import {Button} from "./components/ui/button";

// export default function StencilEditor() {
//   const canvasRef = useRef(null);
//   const fabricCanvas = useRef(null);
//   const imgRef = useRef(null);
//   const stencilRef = useRef(null);
//   const dispatch = useDispatch();
//   const { transform } = useSelector((state) => state.editor);

//   const [imageUploaded, setImageUploaded] = useState(false);

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       selection: false,
//     });
//     fabricCanvas.current = canvas;
  
//     const resizeCanvas = () => {
//       canvas.setDimensions({
//         width: window.innerWidth * 0.8,
//         height: window.innerHeight * 0.6,
//       });
//     };
  
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
  
//     const stencil = new fabric.Rect({
//       left: 50,
//       top: 50,
//       width: 300,
//       height: 300,
//       rx: 20,
//       ry: 20,
//       fill: "white",
//       stroke: "gray",
//       strokeWidth: 2,
//       selectable: false,
//       evented: false,
//     });
  
//     stencilRef.current = stencil;
//     canvas.add(stencil);
//     canvas.clipPath = stencil;
  
//     // 👇 constrain image inside stencil on drag
//     canvas.on("object:moving", (e) => {
//       const obj = e.target;
//       if (obj === imgRef.current) {
//         keepImageInsideStencil(obj); // Constrain movement
//       }
//     });
    
  
//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       canvas.dispose();
//     };
//   }, []);
  

//   const keepImageInsideStencil = (img) => {
//     const stencil = stencilRef.current;
  
//     const imgWidth = img.width * img.scaleX;
//     const imgHeight = img.height * img.scaleY;
  
//     const minLeft = stencil.left + stencil.strokeWidth / 2 - (imgWidth - stencil.width);
//     const maxLeft = stencil.left + stencil.strokeWidth / 2;
  
//     const minTop = stencil.top + stencil.strokeWidth / 2 - (imgHeight - stencil.height);
//     const maxTop = stencil.top + stencil.strokeWidth / 2;
  
//     if (img.left < minLeft) img.left = minLeft;
//     if (img.left > maxLeft) img.left = maxLeft;
//     if (img.top < minTop) img.top = minTop;
//     if (img.top > maxTop) img.top = maxTop;
//   };
  

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
  
//     const reader = new FileReader();
//     reader.onload = () => {
//       const imageUrl = reader.result;
//       const canvas = fabricCanvas.current;
  
//       if (imgRef.current) {
//         canvas.remove(imgRef.current);
//         imgRef.current = null;
//       }
  
//       fabric.Image.fromURL(imageUrl, (img) => {
//         imgRef.current = img;
  
//         // 🔁 Use reset logic for scale and position
//         const scaleX = (canvas.width - 100) / img.width;
//         const scaleY = (canvas.height - 100) / img.height;
//         const scale = Math.min(scaleX, scaleY);
  
//         img.set({
//           left: 50,
//           top: 50,
//           scaleX: scale,
//           scaleY: scale,
//           hasControls: false,
//           lockMovementX: false,
//           lockMovementY: false,
//           selectable: true,
//         });
  
//         canvas.add(img);
//         canvas.setActiveObject(img);
//         canvas.renderAll();
  
//         setImageUploaded(true);
//         dispatch(setTransform({ scaleX: scale, scaleY: scale, left: 50, top: 50 }));
//       });
//     };
//     reader.readAsDataURL(file);
//   };
  
  
  

//   const handleZoom = (factor) => {
//     const img = imgRef.current;
//     if (!img) return;
  
//     const newScaleX = img.scaleX * factor;
//     const newScaleY = img.scaleY * factor;
  
//     img.set({ scaleX: newScaleX, scaleY: newScaleY });
//     keepImageInsideStencil(img); // 👈 constrain it after zoom
  
//     fabricCanvas.current.renderAll();
//     dispatch(setTransform({ ...transform, scaleX: newScaleX, scaleY: newScaleY }));
//   };
  

//   const handleReset = () => {
//     const img = imgRef.current;
//     if (!img) return;
  
//     const canvas = fabricCanvas.current;
//     const scaleX = (canvas.width - 100) / img.width;
//     const scaleY = (canvas.height - 100) / img.height;
//     const scale = Math.min(scaleX, scaleY);
  
//     img.set({
//       left: 50,
//       top: 50,
//       scaleX: scale,
//       scaleY: scale,
//     });
  
//     keepImageInsideStencil(img); // 👈 constrain here too
  
//     canvas.renderAll();
//     dispatch(resetEditor());
//   };
  

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <input type="file" accept="image/*" onChange={handleImageUpload} />

//       <div className="border shadow-lg" style={{ width: "80vw", height: "60vh" }}>
//         <canvas ref={canvasRef} />
//       </div>

//       {imageUploaded && (
//         <div className="flex gap-2 mt-4">
//           <Button onClick={() => handleZoom(1.1)}>Zoom In</Button>
//           <Button onClick={() => handleZoom(0.9)}>Zoom Out</Button>
//           <Button onClick={handleReset}>Reset</Button>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { setTransform, resetEditor } from "./redux/actions";
import { Button } from "./components/ui/button";

export default function StencilEditor() {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const { transform } = useSelector((state) => state.editor);
  const [imageUploaded, setImageUploaded] = useState(false);

  const initializeCanvas = (width, height) => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      selection: false,
    });
    fabricCanvas.current = canvas;
    return canvas;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;

      fabric.Image.fromURL(imageUrl, (img) => {
        // Remove existing canvas and reinitialize
        if (fabricCanvas.current) {
          fabricCanvas.current.dispose();
        }

        // Initialize new canvas with image dimensions
        const canvas = initializeCanvas(img.width, img.height);

        img.set({
          left: 0,
          top: 0,
          scaleX: 1,
          scaleY: 1,
          hasControls: true,
          hasBorders: true,
          lockMovementX: false,
          lockMovementY: false,
          selectable: true,
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();

        imgRef.current = img;
        setImageUploaded(true);

        dispatch(setTransform({ scaleX: 1, scaleY: 1, left: 0, top: 0 }));
      });
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    const img = imgRef.current;
    if (!img) return;

    img.set({
      left: 0,
      top: 0,
      scaleX: 1,
      scaleY: 1,
    });
    fabricCanvas.current.setActiveObject(img);
    fabricCanvas.current.renderAll();
    dispatch(resetEditor());
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <div className="border shadow-lg">
        <canvas ref={canvasRef} />
      </div>

      {imageUploaded && (
        <div className="flex gap-2 mt-4">
          <Button onClick={handleReset}>Reset to Original</Button>
        </div>
      )}
    </div>
  );
}







