import React from "react";
import { Spinner } from "react-bootstrap";
import "./loading-view.scss";

export function LoadingView() {
  return (
    <div className="loading">
      <h1 className="loading-title">Loading...</h1>
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  );
}
