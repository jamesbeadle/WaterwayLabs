import { writable } from 'svelte/store';
import type { Project } from '../../types';

export const selectedProjectStore = writable<Project | null>(null);