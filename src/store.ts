import {
  Edge,
  Node,
} from "reactflow";
import { create } from "zustand";
import { nanoid } from "nanoid/non-secure";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: "root",
      type: "mindmap",
      data: {
        label: "[TES-100] Login page",
      },
    },
    {
      id: "h-1",
      type: "mindmap",
      data: {
        label: "Requirements",
        isCollapsable: true,
      },
    },
    {
      id: "h-2",
      type: "mindmap",
      data: {
        label: "Defects",
        isCollapsable: true,
      },
    },
    {
      id: "h-3",
      type: "mindmap",
      data: {
        label: "Test Cases",
        isCollapsable: true,
      },
    },
    {
      id: "1",
      type: "mindmap",
      data: {
        label: "There is no linked requirements yet.",
        isEmpty: true,
      },
    },
    {
      id: "2",
      type: "mindmap",
      data: {
        label: "There is no linked defects yet.",
        isEmpty: true,
      },
    },
    {
      id: "3",
      type: "mindmap",
      data: {
        label: "[TC-1] Login with valid credentials",
        status: "Passed",
      },
    },
    {
      id: "4",
      type: "mindmap",
      data: {
        label: "[TC-2] Login with invalid credentials",
        status: "Passed",
      },
    },
  ],
  edges: [
    {
      id: "root-h1",
      source: "root",
      target: "h-1",
      type: "mindmap",
    },
    {
      id: "root-h2",
      source: "root",
      target: "h-2",
      type: "mindmap",
    },
    {
      id: "root-h3",
      source: "root",
      target: "h-3",
      type: "mindmap",
    },
    {
      id: "h1-1",
      source: "h-1",
      target: "1",
      type: "mindmap",
      animated: true,
      style: { stroke: "lightGray" },
    },
    {
      id: "h2-2",
      source: "h-2",
      target: "2",
      type: "float",
      animated: true,
      style: { stroke: "lightGray" },
    },
    {
      id: "h3-3",
      source: "h-3",
      target: "3",
      type: "float",
    },
    {
      id: "h3-4",
      source: "h-3",
      target: "4",
      type: "float",
    },
  ],
}));

export default useStore;
