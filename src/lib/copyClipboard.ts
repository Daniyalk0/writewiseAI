export   const handleCopy = async (output, setCopiedIndex, index) => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };