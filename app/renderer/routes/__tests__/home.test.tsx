import React from 'react';
import { vi, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import { useWardrobeStore } from '../../state/useWardrobeStore';

vi.mock('../../state/useWardrobeStore');

const mockedStore = useWardrobeStore as unknown as Mock;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Home route', () => {
  beforeEach(() => {
    mockedStore.mockReturnValue({
      outfits: [
        { id: '1', name: 'Layered Look', occasion: 'Weekend', style: 'casual', favorite: true, itemIds: [], closetId: 'c1' },
      ],
      items: [],
      initialize: vi.fn(),
    });
  });

  it("renders today's outfit title", () => {
    render(<Home />, { wrapper });
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
  });
});
