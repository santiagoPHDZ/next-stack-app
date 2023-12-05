
import * as React from "react";
import { cn } from "@/lib/utils";

// text
const Text = ({
    level, className, muted = false, children
}: {
    className?: string, muted?: boolean, level: 0 | 1 | 2 | 3 | 4 | 5 | 6, children: React.ReactNode
}) => {
    const stackClassName = cn(className, muted ? "text-muted-foreground" : "");

    // <h1>Main Title</h1>
    // <p>Introduction paragraph.</p>
    // <h2>Section 1</h2>
    // <p>Content for section 1.</p>
    // <h3>Subsection 1.1</h3>
    // <p>Content for subsection 1.1.</p>
    // <h2>Section 2</h2>
    // <p>Content for section 2.</p>

    if (level === 0) {
        return <p className={stackClassName}>{children}</p>; // Format paragraphs of text, for standard text blocks.
    } else if (level === 1) {
        return <h1 className={stackClassName}>{children}</h1>; // highest-level, only one <h1> per page.
    } else if (level === 2) {
        return <h2 className={stackClassName}>{children}</h2>; // For section headings and subheadings.
    } else if (level === 3) {
        return <h3 className={stackClassName}>{children}</h3>; // Used for subsections within <h2> sections.
    } else if (level === 4) {
        return <h4 className={stackClassName}>{children}</h4>; // Further sublevels of headings with decreasing importance. 
    } else if (level === 5) {
        return <h5 className={stackClassName}>{children}</h5>;
    } else if (level === 6) {
        return <h6 className={stackClassName}>{children}</h6>;
    }
}

export { Text };
