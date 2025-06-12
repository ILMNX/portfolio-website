// Create: components/pdf-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export default function PdfModal({ isOpen, onClose, pdfUrl, title }: PdfModalProps) {
  const [zoom, setZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [pdfSupported, setPdfSupported] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      // Check if PDF is supported in iframe
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      const isMobileBrowser = isIOS || isAndroid;
      
      setPdfSupported(!isMobileBrowser);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  const handleViewPdf = () => {
    // Force open in browser's PDF viewer
    window.location.href = pdfUrl;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative w-full h-full bg-white dark:bg-gray-800 overflow-hidden flex flex-col ${
              isMobile ? 'mx-0 rounded-none' : 'max-w-6xl max-h-[90vh] mx-4 rounded-lg'
            }`}
            initial={{ scale: isMobile ? 1 : 0.8, opacity: 0, y: isMobile ? '100%' : 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: isMobile ? 1 : 0.8, opacity: 0, y: isMobile ? '100%' : 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with controls */}
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white truncate pr-2">
                {title}
              </h3>
              
              <div className="flex items-center gap-1 md:gap-2">
                {/* Mobile actions */}
                {isMobile && (
                  <>
                    <button
                      onClick={handleViewPdf}
                      className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition"
                      title="View PDF"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View</span>
                    </button>
                    <button
                      onClick={handleOpenInNewTab}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition"
                      title="Open in New Tab"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Open</span>
                    </button>
                  </>
                )}

                {/* Desktop zoom controls */}
                {!isMobile && pdfSupported && (
                  <div className="flex items-center gap-1 bg-white dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={handleZoomOut}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition"
                      title="Zoom Out"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <span className="px-2 text-sm font-medium min-w-[60px] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    
                    <button
                      onClick={handleZoomIn}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition"
                      title="Zoom In"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition ${
                    isMobile ? 'text-xs' : ''
                  }`}
                  title="Download PDF"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="hidden xs:inline">Download</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition"
                  title="Close"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
              {isMobile || !pdfSupported ? (
                // Mobile/Unsupported: Show options instead of iframe
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full">
                    <div className="mb-6">
                      <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        PDF Viewer
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        PDF preview is not available on mobile browsers. Use the options below to view the document.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <button
                        onClick={handleViewPdf}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View PDF in Browser
                      </button>
                      
                      <button
                        onClick={handleOpenInNewTab}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Open in New Tab
                      </button>
                      
                      <button
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Desktop: Full featured viewer with zoom
                <div className="flex justify-center p-4">
                  <div 
                    className="w-full max-w-4xl overflow-auto"
                    style={{ maxHeight: 'calc(90vh - 100px)' }}
                  >
                    <object
                      data={`${pdfUrl}#zoom=${zoom * 100}&view=FitH&toolbar=1`}
                      type="application/pdf"
                      className="w-full border-0 rounded-lg shadow-lg"
                      style={{ 
                        height: '70vh',
                        minHeight: '500px',
                      }}
                    >
                      <iframe
                        src={`${pdfUrl}#zoom=${zoom * 100}&view=FitH&toolbar=1`}
                        className="w-full h-full border-0 rounded-lg shadow-lg"
                        title={title}
                      />
                    </object>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}