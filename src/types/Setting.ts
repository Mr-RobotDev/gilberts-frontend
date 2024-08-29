type Setting = {
  id: string;
  value: number;
};

export type Settings<T extends string> = Record<T, Setting[]> & {
  find: (
    predicate: (value: Setting, index: number, obj: Setting[]) => boolean
  ) => Setting | undefined;
};

export type teacherInterfaceResponse = {
  id: string;
  value: number;
}