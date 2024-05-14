"use client"

import React, { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Page from "./page_inside";

const PageWrapper = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Page />
      </Suspense>
    );
  };
  
  export default PageWrapper;