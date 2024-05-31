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
      position: {
        x: 0,
        y: 0,
      },
      width: 162,
      height: 22,
      selected: false,
      dragging: false,
    },
    {
      id: "h-1",
      type: "mindmap",
      data: {
        label: "Requirements",
        isCollapsable: true,
      },
      position: {
        x: 300,
        y: 0,
      },
      parentId: "root",
      width: 162,
      height: 22,
      selected: false,
      dragging: false,
    },
    {
      id: "h-2",
      type: "mindmap",
      data: {
        label: "Defects",
        isCollapsable: true,
      },
      position: {
        x: 300,
        y: 100,
      },
      parentId: "root",
      width: 162,
      height: 22,
      selected: false,
      dragging: false,
    },
    {
      id: "h-3",
      type: "mindmap",
      data: {
        label: "Test Cases",
        isCollapsable: true,
      },
      position: {
        x: 300,
        y: 200,
      },
      parentId: "root",
      width: 162,
      height: 22,
      selected: false,
      dragging: false,
    },
    {
      id: "1",
      type: "mindmap",
      data: {
        label: "There is no linked requirements yet.",
        isEmpty: true,
      },
      position: {
        x: 300,
        y: 10,
      },
      parentId: "h-1",
      width: 162,
      height: 22,
      selected: true,
      dragging: false,
    },
    {
      id: "2",
      type: "mindmap",
      data: {
        label: "There is no linked defects yet.",
        isEmpty: true,
      },
      position: {
        x: 300,
        y: 10,
      },
      parentId: "h-2",
      width: 162,
      height: 10,
      selected: false,
      dragging: false,
    },
    {
      id: "3",
      type: "mindmap",
      data: {
        label: "[TC-1] Login with valid credentials",
        status: "Passed",
      },
      position: {
        x: 300,
        y: 10,
      },
      parentId: "h-3",
      width: 162,
      height: 22,
      selected: true,
      dragging: false,
    },
    {
      id: "4",
      type: "mindmap",
      data: {
        label: "[TC-2] Login with invalid credentials",
        status: "Passed",
      },
      position: {
        x: 300,
        y: 80,
      },
      parentId: "h-3",
      width: 162,
      height: 22,
      selected: true,
      dragging: false,
    },
  ],
  edges: [
    {
      id: "root-h1",
      source: "root",
      target: "h-1",
      type: "float",
    },
    {
      id: "root-h2",
      source: "root",
      target: "h-2",
      type: "float",
    },
    {
      id: "root-h3",
      source: "root",
      target: "h-3",
      type: "float",
    },
    {
      id: "h1-1",
      source: "h-1",
      target: "1",
      type: "float",
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
