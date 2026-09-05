from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title='ClusterLab',
    version='0.1.0'
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   "https://clusterlab.vercel.app",
                   "https://clusterlab.site",
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from backend.routers import users, fields
app.include_router(users.router)
app.include_router(fields.router)



@app.get('/')
async def root():
    return {'message': 'Welcome to ClusterLab'}
