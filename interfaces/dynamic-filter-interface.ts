/**
 * Dynamic Filter System — TypeScript Interfaces
 *
 * Mirrors the three DB tables: ySec (sections), yFld (fields), yFldVal (field option values).
 *
 * Column mapping from the raw API response (getYParamListAPI):
 *   PTyp       → type discriminator  ("ySec" | "yFld" | "yFldVal")
 *   PMCd       → fieldKey / sectionKey
 *   PSCd       → sectionKey (for yFld) | parentFieldKey (for yFldVal)
 *   PDesc      → label (display label)
 *   PDesc225   → placeholder / secondary label
 *   PValue     → componentType  ("dropdown"|"range"|"checkbox"|"multiselect"|"upload")
 *   PNum       → sortOrder
 *   PValue1    → scopeVisibility  ("All" | "Stock" | "Design Bank" | …)
 *   PNum1      → reserved / numeric flag
 *   PValue2    → userVisibility   ("All" | specific user group)
 *   PValidYn   → isActive         ("Y" | "N")
 *   PPrtKey    → parentKey        ("C" = catalog root, etc.)
 *   yPIdNo     → uniqueId         (0 = generic / shared)
 */

// ─── Raw API row shapes ────────────────────────────────────────────────────────

export interface RawYSec {
  PTyp: 'ySec';
  PMCd: string;           // e.g. "Source", "Category"
  PSCd: string;           // context string, e.g. "Filter"
  PDesc: string;          // display label, e.g. "Price & Weight"
  PDesc225: string;
  PValue: string;
  PNum: number;           // sortOrder
  PValue1: string;        // scopeVisibility
  PNum1: number;
  PValue2: string;        // userVisibility
  PValidYn: 'Y' | 'N';
  PPrtKey: string;
  yPIdNo: number;
}

export interface RawYFld {
  PTyp: 'yFld';
  PMCd: string;           // fieldKey, e.g. "stockType", "DmCtg"
  PSCd: string;           // sectionKey this field belongs to, e.g. "Source"
  PDesc: string;          // label, e.g. "Stock Type"
  PDesc225: string;       // placeholder / secondary label, e.g. "ZSELF"
  PValue: string;         // componentType: "dropdown" | "range" | "checkbox" | "multiselect" | "upload"
  PNum: number;           // sortOrder within section
  PValue1: string;        // scopeVisibility ("All" | "Stock" | "Design Bank" | …)
  PNum1: number;
  PValue2: string;        // userVisibility ("All" | specific)
  PValidYn: 'Y' | 'N';
  PPrtKey: string;
  yPIdNo: number;
}

export interface RawYFldVal {
  PTyp: 'yFldVal';
  PMCd: string;           // parentFieldKey, e.g. "stockType", "SortBy"
  PSCd: string;           // option label / value, e.g. "In Stock", "On Memo"
  PDesc: string;
  PDesc225: string;
  PValue: string;
  PNum: number;           // sortOrder of this option
  PValue1: string;        // scopeVisibility
  PNum1: number;
  PValue2: string;        // userVisibility
  PValidYn: 'Y' | 'N';
  PPrtKey: string;
  yPIdNo: number;
}

// ─── Normalised / processed shapes (used by the FE renderer) ─────────────────

/** A single option inside a dropdown / multiselect */
export interface FilterFieldOption {
  label: string;         // PSCd from yFldVal row
  value: string;         // PSCd (same, used as the form value)
  sortOrder: number;     // PNum
  scopeVisibility: string;
  userVisibility: string;
}

/** Supported component types */
export type FilterComponentType =
  | 'dropdown'
  | 'multiselect'
  | 'range'
  | 'checkbox'
  | 'upload';

/** A single filter field, ready for the FE to render */
export interface FilterField {
  fieldKey: string;             // PMCd  e.g. "stockType"
  sectionKey: string;           // PSCd  — which section this belongs to
  label: string;                // PDesc
  placeholder: string;          // PDesc225
  componentType: FilterComponentType; // PValue
  sortOrder: number;            // PNum
  scopeVisibility: string;      // PValue1 — "All" | "Stock" | "Design Bank" | …
  userVisibility: string;       // PValue2 — "All" | specific
  isActive: boolean;            // PValidYn === "Y"
  uniqueId: number;             // yPIdNo
  /** Only populated for dropdown / multiselect / checkbox fields */
  options: FilterFieldOption[];
}

/** A filter section (tab on the left sidebar) */
export interface FilterSection {
  sectionKey: string;           // PMCd  e.g. "Source"
  label: string;                // PDesc — display label, e.g. "Price & Weight"
  sortOrder: number;            // PNum
  scopeVisibility: string;      // PValue1
  userVisibility: string;       // PValue2
  isActive: boolean;
  uniqueId: number;
  /** Fields belonging to this section, sorted by sortOrder */
  fields: FilterField[];
}

/** The top-level normalised filter config — this is what the FE consumes */
export interface DynamicFilterConfig {
  sections: FilterSection[];
}

// ─── FE state shape (mirrors what the sidebar currently stores in `filters`) ──

/**
 * Each key corresponds to a FilterField.fieldKey.
 * Value semantics per componentType:
 *   dropdown    → { label: string; value: string } | null
 *   multiselect → Array<{ label: string; value: string }>
 *   range       → [min: number, max: number]
 *   checkbox    → boolean
 *   upload      → File | null
 */
export type FilterFieldValue =
  | { label: string; value: string } | null          // dropdown
  | Array<{ label: string; value: string }>           // multiselect
  | [number, number]                                  // range
  | boolean                                           // checkbox
  | File | null;                                      // upload

export type DynamicFilterState = Record<string, FilterFieldValue>;
