import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostsService, QueryPost } from './posts.service';
import { Post } from '../models/post';

export const mockPost: Post = {
  body: 'Test Body',
  id: 1,
  title: 'Test Title',
  user_id: 1,
};

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  const mockQuery: QueryPost = {
    page: 1,
    pageSize: 10,
    userId: 1,
    title: 'Test Title',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });

    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve posts with query parameters', () => {
    const mockPosts: Post[] = [
      // Create mock Post objects as needed
    ];

    service.getPosts(mockQuery).subscribe((posts) => {
      expect(posts.length).toBe(mockPosts.length);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes(service['apiURL'])
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe(mockQuery.page.toString());
    expect(req.request.params.get('per_page')).toBe(
      mockQuery.pageSize.toString()
    );
    expect(req.request.params.get('user_id')).toBe(
      mockQuery.userId !== undefined ? mockQuery.userId.toString() : null
    );
    if (mockQuery.title !== undefined) {
      expect(req.request.params.get('title')).toBe(mockQuery.title);
    } else {
      expect(req.request.params.get('title')).toBeNull();
    }
    req.flush(mockPosts);
  });

  it('should remove a post by ID', () => {
    const postId = 1;

    service.removePost(postId).subscribe(() => {
      // Expect nothing here, as we're just testing the request
    });

    const req = httpMock.expectOne(`${service['apiURL']}/${postId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should create a post', () => {
    service.createPost(mockPost).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes(service['apiURL'])
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockPost);
  });

  it('should update a post', () => {
    const postId = 1;

    service.updatePost(postId, mockPost).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/${postId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockPost);
  });
});
