import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { setImageData, setTransform, resetEditor } from "./redux/actions";
import { Button } from "@/components/ui/button";

export default function StencilEditor() {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const imgRef = useRef(null);
  const dispatch = useDispatch();

  const { imageData, transform } = useSelector((state) => state.editor);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: false,
    });
    fabricCanvas.current = canvas;

    // Responsive canvas
    const resizeCanvas = () => {
      canvas.setWidth(window.innerWidth * 0.8);
      canvas.setHeight(window.innerHeight * 0.6);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Stencil Mask (rounded rectangle)
    const stencil = new fabric.Rect({
      left: 50,
      top: 50,
      width: 300,
      height: 300,
      rx: 20,
      ry: 20,
      fill: "white",
      stroke: "gray",
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });
    canvas.add(stencil);

    canvas.clipPath = stencil;

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (img) => {
        imgRef.current = img;
        img.set({
          left: 50,
          top: 50,
          scaleX: 0.5,
          scaleY: 0.5,
          hasControls: false,
        });

        img.on("moving", () => constrainImage(img));
        img.on("scaling", () => constrainImage(img));

        const canvas = fabricCanvas.current;
        canvas.add(img);
        canvas.setActiveObject(img);

        dispatch(setImageData(reader.result));
        dispatch(setTransform({ scaleX: 0.5, scaleY: 0.5, left: 50, top: 50 }));
      });
    };
    reader.readAsDataURL(file);
  };

  const constrainImage = (img) => {
    const bounds = { left: 50, top: 50, width: 300, height: 300 };
    const imgRect = img.getBoundingRect();

    if (imgRect.left < bounds.left) img.left = bounds.left;
    if (imgRect.top < bounds.top) img.top = bounds.top;
    if (imgRect.left + imgRect.width > bounds.left + bounds.width)
      img.left = bounds.left + bounds.width - imgRect.width;
    if (imgRect.top + imgRect.height > bounds.top + bounds.height)
      img.top = bounds.top + bounds.height - imgRect.height;
  };

  const handleZoom = (factor) => {
    if (!imgRef.current) return;
    const newScaleX = imgRef.current.scaleX * factor;
    const newScaleY = imgRef.current.scaleY * factor;
    imgRef.current.scaleX = newScaleX;
    imgRef.current.scaleY = newScaleY;
    constrainImage(imgRef.current);
    fabricCanvas.current.requestRenderAll();
    dispatch(setTransform({
      ...transform,
      scaleX: newScaleX,
      scaleY: newScaleY,
    }));
  };

  const handleReset = () => {
    if (imgRef.current) {
      imgRef.current.set({ left: 50, top: 50, scaleX: 0.5, scaleY: 0.5 });
      fabricCanvas.current.requestRenderAll();
    }
    dispatch(resetEditor());
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div className="border shadow-lg" style={{ width: "80vw", height: "60vh" }}>
        <canvas ref={canvasRef} />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => handleZoom(1.1)}>Zoom In</Button>
        <Button onClick={() => handleZoom(0.9)}>Zoom Out</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}
